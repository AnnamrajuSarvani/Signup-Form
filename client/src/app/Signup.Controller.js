angular.module('demo')
  .controller('SignUpCtrl', function ($scope,$location, $http, Auth, AUTH_EVENTS, $sanitize,$document) {

  	var _scope={};
    $scope.registration={ };  
    



    //Registration Process
    $scope.signUpProcess=function(signupForm,isSameEmail){
    	alert('Hi');
        $scope.submitted=true;
        if(signupForm.$valid && $scope.followTerm && ($scope.registration.password ==$scope.confirmHashedPassword)){
            // $scope.registration.paypalEmail=(isSameEmail ? $scope.registration.email : $scope.registration.paypalEmail);
            // $scope.registration.session_secret =$('#capture').find('input[name="session_secret"]').val();
            // Participant.save({user: $scope.registration})
            //     .$promise.then(function(data){
            //         //$location.path("/participant/login");
            //         $document.scrollTo(top,2);
            //         $scope.registration={};
            //         $scope.submitted=false;
            //          $scope.isSameEmail=false;
            //          $scope.confirmHashedPassword='';
            //          $scope.followTerm=false;
            //         $scope.addNotification(data.message,"success",10000);
            //     })
            //     .catch(function(error){
            //       $document.scrollTo(top,2);
            //        if(error.data.message.message=='Validation failed'){
            //             for(var key in error.data.message.errors){
            //             $scope.addNotification(error.data.message.errors[key].message,"danger",5000);
            //         }
            //        }
            //        else{

            //         $scope.addNotification(error.data.message,"danger",5000);
            //        }
                    
            //         processCapture();
            //     });		

			$http.post('/user',$scope.registration).then(function(data){
					// console.log('success');
					$scope.addNotification("successfull registration",10000);
				}).catch(function(error){
					$document.scrollTo(top,2);
                   if(error.data.message.message=='Validation failed'){
                        for(var key in error.data.message.errors){
                        $scope.addNotification(error.data.message.errors[key].message,"danger",5000);
                    }
                   }
                   else{

                    $scope.addNotification(error.data.message,"danger",5000);
                   }
                    
			});


        }
    }