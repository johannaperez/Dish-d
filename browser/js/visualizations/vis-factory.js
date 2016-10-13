app.factory('VisFactory', function($http){
    return {
        getAllMeals: (userId) => {
            return $http.get(`api/users/${userId}/meals/all`)
            .then((response) => {
                return response.data;
            })
        }
    }
});
