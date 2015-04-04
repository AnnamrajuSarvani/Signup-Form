var formApp = angular.module('formApp', [])

    .controller('formController', function($scope) {
  
        // we will store our form data in this object
        $scope.formData = {};
        
    });

app.controller('userCtrl', [ '$scope', '$http','$location', 'growl',
	function($scope, $http, $location,  growl){		
		$scope.submit = function(){		
			if ($scope.userForm.$valid) {			
				$http.post('/user',$scope.formData).then(function(data){
					// console.log('success');
					// $scope.sectionList = data;
					$scope.showSuccessMessage = true;
					 growl.addSuccessMessage('You are registered succesfully!');
					 // $('#form-signup').modal('hide');
				}).catch(function(error){
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