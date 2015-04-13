var formApp = angular.module('formApp', [])

    .controller('formController', function($scope) {
  
        // we will store our form data in this object
        $scope.formData = {};
        
    });

app.controller('userCtrl', [ '$scope', '$http','$location', 'growl',
	function($scope, $http, $location,  growl){		
		$scope.submit = function(){	
			$scope.submitted=true;
        	// if(signupForm.$valid && $scope.followTerm && ($scope.formData.password ==$scope.confirmHashedPassword)){	
			if ($scope.signupForm.$valid) {			
				$http.post('/user',$scope.formData).then(function(data){
					console.log('success');
					// $scope.addNotification("successfull registration",10000);
					// growl.success("successfull registration");
					growl.addSuccessMessage("successfull registration");
					// $scope.formData.lname='';
					// $scope.formData.fname='';
					// $scope.formData.email='';
					// $scope.formData.password='';
					// $scope.confirmHashedPassword='';

				}).catch(function(error){
					console.log(error);
					growl.addErrorMessage("oops! something went wrong");
				})
			}
			else
			{
				growl.addErrorMessage('please provide valid details!');	
			}
		}

	}]
)