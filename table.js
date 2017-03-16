var fessmodule = angular.module('myModule', []);

fessmodule.controller('ctrlRead', function ($scope, $filter) {

    // init
    $scope.sort = {
        sortingOrder: 'id',
        reverse: false
    };

    $scope.gap = 5;
    $scope.searchItems = [$scope.Items];
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 10;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.items = [
        {
            "id": 1,
            "name": "!addcom",
            "uso": "!addcom [comando] [texto do comando]",
            "desc": "Adicionar um comando personalizado",
            "nivel": "Moderador"
        },
        {
            "id": 2,
            "name": "!editcom",
            "uso": "!editcom [comando] [texto do comando]",
            "desc": "Substitui o comando personalizado fornecido",
            "nivel": "Moderador"
        },
        {
            "id": 3,
            "name": "!delcom",
            "uso": "!delcom [comando]",
            "desc": "Deleta um comando personalizado",
            "nivel": "Moderador"
        },
        {
            "id": 4,
            "name": "!disablecom",
            "uso": "!disablecom [comando]",
            "desc": "Desabilita um comando de ser utilizado no chat",
            "nivel": "Moderador"
        },
        {
            "id": 5,
            "name": "!enablecom",
            "uso": "!enablecom [comando]",
            "desc": "Habilita um comando que foi desabilitado de ser usado no chat",
            "nivel": "Moderador"
        },
        {
            "id": 6,
            "name": "!highlight",
            "uso": "!highlight [descrição]",
            "desc": "Marca um highlight usando a descrição fornecida e com o time-stamps",
            "nivel": "Moderador"
        },
        {
            "id": 7,
            "name": "!lastseen",
            "uso": "!lastseen [usuário]",
            "desc": "Descubra quando o usuário em questão interagiu pela última vezno chat",
            "nivel": "Moderador"
        },
        {
            "id": 8,
            "name": "!permit",
            "uso": "!permit [usuário]",
            "desc": "Dá permissão para um usuário postar links",
            "nivel": "Moderador"
        },
        {
            "id": 9,
            "name": "!followage",
            "uso": "!followage",
            "desc": "Indica quanto tempo você segue o canal",
            "nivel": "Regular"
        },
        {
            "id": 10,
            "name": "!uptime",
            "uso": "!uptime",
            "desc": "Indica quanto tempo o canal está streamando",
            "nivel": "Regular"
        },
        {
            "id": 11,
            "name": "!age",
            "uso": "!age",
            "desc": "Mostra a quanto tempo você está registrado na Twitch",
            "nivel": "Regular"
        },
        {
            "id": 12,
            "name": "!vod",
            "uso": "!vod",
            "desc": "Exibe o tempo atual da stream e o VOD atual ou, se estiver off-line, o último VOD disponível.",
            "nivel": "Regular"
        },
        {
            "id": 13,
            "name": "!songrequest",
            "uso": "!songrequest [YouTube ID | YouTube link | termos de busca]",
            "desc": "Peça uma música!",
            "nivel": "Regular"
        },
        {
            "id": 14,
            "name": "!youtube",
            "uso": "!youtube",
            "desc": "Acompanhe nosso canal no Youtube! http://www.youtube.com/WeAreBrazilians",
            "nivel": "Regular"
        },
        {
            "id": 15,
            "name": "!yt",
            "uso": "!yt",
            "desc": "!youtube alias",
            "nivel": "Regular"
        },
        {
            "id": 16,
            "name": "!facebook",
            "uso": "!facebook",
            "desc": "Curta nossa página no Facebook e fique por dentro do que acontece na bZ! http://www.facebook.com/WeAreBrazilians",
            "nivel": "Regular"
        },
        {
            "id": 17,
            "name": "!fb",
            "uso": "!fb",
            "desc": "!facebook alias",
            "nivel": "Regular"
        },
        {
            "id": 18,
            "name": "!twitter",
            "uso": "!twitter",
            "desc": "Nos siga no twitter e mantenha-se informado! http://twitter.com/WeAreBrazilianz",
            "nivel": "Regular"
        },
        {
            "id": 19,
            "name": "!tt",
            "uso": "!tt",
            "desc": "!twitter alias",
            "nivel": "Regular"
        },

    ];

    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.items, function (item) {
            for (var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sort.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };


    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    $scope.range = function (size, start, end) {
        var ret = [];
        console.log(size, start, end);

        if (size < end) {
            end = size;
            start = ((size - $scope.gap) < 0) ? 0 : (size - $scope.gap);
        } else if (end % 5 != 0) {
            end = end - (end % 5);
            start = end - $scope.gap;
        }

        for (var i = start; i < end; i++) {
            ret.push(i);
        }

        return ret;

    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function (goToPage) {
        if (goToPage != undefined) {
            this.n = goToPage;
        }
        $scope.currentPage = this.n;
    };

    // functions have been describe process the data for display
    $scope.search();

    $scope.resetFilters = function () {
        $scope.search = {};
    };


    $scope.$watch('search', function (newVal, oldVal) {
        $scope.filtered = filterFilter($scope.items, newVal);
        $scope.totalItems = $scope.filtered.length;
        $scope.noOfPages = Math.ceil($scope.items / $scope.entryLimit);
        $scope.currentPage = 0;
    }, true);


});


fessmodule.$inject = ['$scope', '$filter'];

fessmodule.directive("customSort", function () {
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            order: '=',
            sort: '='
        },
        template: ' <a ng-click="sort_by(order)" style="color: #555555;">' +
            '    <span ng-transclude></span>' +
            '    <i ng-class="selectedCls(order)"></i>' +
            '</a>',
        link: function (scope) {

            // change sorting order
            scope.sort_by = function (newSortingOrder) {
                var sort = scope.sort;

                if (sort.sortingOrder == newSortingOrder) {
                    sort.reverse = !sort.reverse;
                }

                sort.sortingOrder = newSortingOrder;
            };


            scope.selectedCls = function (column) {
                if (column == scope.sort.sortingOrder) {
                    return ('icon-chevron-' + ((scope.sort.reverse) ? 'down' : 'up'));
                } else {
                    return 'icon-sort'
                }
            };
        } // end link
    }
});
