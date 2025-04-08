angular.module('makeupApp')
.controller('MainController', function($scope, $http, $timeout) {
  $scope.appointments = [];
  $scope.appointment = {};
  $scope.showToast = false;
  $scope.fadingToast = false;

  // Available time slots in 3x3 format
  $scope.timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM",
    "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  // Load appointments from backend
  $scope.getAppointments = function() {
    $http.get('http://localhost:5000/api/appointments')
      .then(function(res) {
        $scope.appointments = res.data.map(app => ({
          ...app,
          fading: false
        }));
      });
  };

  // Book a new appointment
  $scope.bookAppointment = function () {
    $http.post('http://localhost:5000/api/appointments', $scope.appointment)
      .then(function (res) {
        const newApp = { ...res.data, fading: false };
        $scope.appointments.push(newApp);
        $scope.appointment = {}; // clear the form

        //  Show toast
        $scope.showToast = true;
        $scope.fadingToast = false;

        //  Confetti
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 }
          });
        }

        //  Fade out toast after 5s
        $timeout(() => {
          $scope.fadingToast = true;
          $timeout(() => {
            $scope.showToast = false;
            $scope.fadingToast = false;
          }, 600);
        }, 5000);

        //  Fade out and DELETE appointment from DB
        $timeout(() => {
          newApp.fading = true;

          $timeout(() => {
            $http.delete(`http://localhost:5000/api/appointments/${newApp._id}`)
              .then(() => {
                const index = $scope.appointments.indexOf(newApp);
                if (index !== -1) {
                  $scope.appointments.splice(index, 1);
                }
              })
              .catch(err => {
                console.error("Failed to delete from MongoDB:", err);
              });
          }, 600);
        }, 5000);
      });
  };

  $scope.getAppointments();

  //  Init calendar
  $timeout(() => {
    flatpickr(".calendar", {
      dateFormat: "Y-m-d",
      minDate: "today"
    });
  });
});
