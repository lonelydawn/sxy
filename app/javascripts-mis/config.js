/**
 * Created by lonelydawn on 2017-03-03.
 */



var app = angular.module('app', ['ui.router', 'jsonFormatter', 'toaster', 'ngAnimate', 'ngSanitize', 'ngCookies', 'angular-loading-bar', 'perfect_scrollbar', 'angularFileUpload']);
// 标识登录角色
var global_role = undefined;
// 标识全局资源基路径
var global_baseurl = "uploads/";
// 全局模块
var global_modules = {
    "teacher_modules": [
        {
            text: "个人信息",
            icon: "glyphicon glyphicon-tags",
            moduleId: "1008601",
            href: "main.selfInfo"
        }, {
            text: "宣传管理",
            moduleId: "1008602",
            selectable: false,
            state: {
                expanded: false
            },
            nodes: [{
                text: "企业宣传",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860201",
                href: "main.companyPropagate"
            }, {
                text: "活动宣传",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860202",
                href: "main.activityPropagate"
            }, {
                text: "课程宣传",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860203",
                href: "main.coursePropagate"
            }, {
                text: "优秀学子",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860204",
                href: "main.perfectStudent"
            }]
        }, {
            text: "课程建设",
            selectable: false,
            moduleId: "1008603",
            state: {
                expanded: false
            },
            nodes: [{
                text: "课程表",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860301",
                href: "main.courseTable"
            }, {
                text: "课程资料",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860302",
                href: "main.courseResource"
            }]
        }, {
            text: "学院制度",
            selectable: false,
            moduleId: "1008604",
            state: {
                expanded: false
            },
            nodes: [{
                text: "日常制度",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860401",
                href: "main.dailySystem"
            }, {
                text: "领导职责",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860402",
                href: "main.leaderDuty"
            }]
        }, {
            text: "信息建设",
            selectable: false,
            moduleId: "1008605",
            state: {
                expanded: false
            },
            nodes: [{
                text: "留言板",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860501",
                href: "main.messageBoard"
            }, {
                text: "系统公告",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860502",
                href: "main.systemNotice"
            }]
        }
    ],
    "student_modules": [
        {
            text: "个人信息",
            icon: "glyphicon glyphicon-tags",
            moduleId: "1008601",
            href: "main.selfInfo"
        }, {
            text: "宣传管理",
            moduleId: "1008602",
            selectable: false,
            state: {
                expanded: false
            },
            nodes: [{
                text: "企业宣传",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860201",
                href: "main.companyPropagate"
            }, {
                text: "活动宣传",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860202",
                href: "main.activityPropagate"
            }, {
                text: "课程宣传",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860203",
                href: "main.coursePropagate"
            }, {
                text: "优秀学子",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860204",
                href: "main.perfectStudent"
            }]
        }, {
            text: "课程建设",
            selectable: false,
            moduleId: "1008603",
            state: {
                expanded: false
            },
            nodes: [{
                text: "课程表",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860301",
                href: "main.courseTable"
            }, {
                text: "课程资料",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860302",
                href: "main.courseResource"
            }, {
                text: "缺勤记录",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860303",
                href: "main.absenceRecord"
            }]
        }, {
            text: "学院制度",
            selectable: false,
            moduleId: "1008604",
            state: {
                expanded: false
            },
            nodes: [{
                text: "日常制度",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860401",
                href: "main.dailySystem"
            }, {
                text: "领导职责",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860402",
                href: "main.leaderDuty"
            }]
        }, {
            text: "信息建设",
            selectable: false,
            moduleId: "1008605",
            state: {
                expanded: false
            },
            nodes: [{
                text: "留言板",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860501",
                href: "main.messageBoard"
            }, {
                text: "系统公告",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860502",
                href: "main.systemNotice"
            }]
        }
    ]
};
// 全局数据
var global_config = {
    "config_options": ["行业", "班级", "课程", "职称", "角色", "公告", "活动", "物资", "收支"],
    "user_types": ["学生", "教师"],
    "class_state": ["在读", "毕业", "不明"],
    "student_state": ["在读","毕业","休学","不明"],
    "teacher_state": ["在职","离职","休假","不明"],
    "regulation_types": ["日常制度", "领导职责"],
    "propagate_types": ["企业宣传", "活动宣传", "课程宣传", "优秀学子"],
    "account_action": ["收入", "支出"]
};

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'JSONFormatterConfigProvider', 'cfpLoadingBarProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, JSONFormatterConfigProvider, cfpLoadingBarProvider) {
    // 在请求中设置 X-Requested-With 向服务器声明这是一个XHR请求
    $httpProvider.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest'
    };

    // 默认启用html5模式，使用history api
    $locationProvider.html5Mode({
        enabled: true,
        requireBases: false
    });

    JSONFormatterConfigProvider.hoverPreviewEnabled = true;
    cfpLoadingBarProvider.includeSpinner = true;

    window.httpProvider = $httpProvider;
    $httpProvider.defaults.headers.common.pageSize = 1000;
    $httpProvider.defaults.headers.common.pageNum = 1;
    $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
    $httpProvider.defaults.headers.common.Pragma = "no-cache";

    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login', {
            url: '/login',
            views: {
                'rootView@': {
                    templateUrl: '/partial/mis/login.html',
                    controller: 'loginCtrl'
                }
            }
        })
        .state('error', {
            url: '/error',
            views: {
                'rootView@': {
                    templateUrl: '/partial/mis/error.html',
                    controller: 'errorCtrl'
                }
            }
        })
        .state('main',{
            url: '/main',
            views: {
                'rootView@': {
                    templateUrl: '/partial/mis/main.html',
                    controller: 'mainCtrl'
                }
            }
        })
        .state('main.homepage',{
            url: '/homepage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/homepage.html',
                    controller: 'homepageCtrl'
                }
            }
        })
        .state('main.selfInfo',{
            url: '/selfInfo',
            views: {
                'content': {
                    templateUrl: '/partial/mis/selfInfo/selfInfo.html',
                    controller: 'selfInfoCtrl'
                }
            }
        })
        .state('main.companyPropagate',{
            url: '/companyPropagate',
            params: {
                "typeIndex": 0,
                "pageNum": 0,
                "searchText": ''
            },
            views: {
                'content': {
                    templateUrl: '/partial/mis/collegePropagate/companyPropagate.html',
                    controller: 'propagateCtrl'
                }
            }
        })
        .state('main.activityPropagate',{
            url: '/activityPropagate',
            params: {
                "typeIndex": 1,
                "pageNum": 0,
                "searchText": ''
            },
            views: {
                'content': {
                    templateUrl: '/partial/mis/collegePropagate/activityPropagate.html',
                    controller: 'propagateCtrl'
                }
            }
        })
        .state('main.coursePropagate',{
            url: '/coursePropagate',
            params: {
                "typeIndex": 2,
                "pageNum": 0,
                "searchText": ''
            },
            views: {
                'content': {
                    templateUrl: '/partial/mis/collegePropagate/coursePropagate.html',
                    controller: 'propagateCtrl'
                }
            }
        })
        .state('main.excellentStudent',{
            url: '/excellentStudent',
            params: {
                "typeIndex": 3,
                "pageNum": 0,
                "searchText": ''
            },
            views: {
                'content': {
                    templateUrl: '/partial/mis/collegePropagate/excellentStudent.html',
                    controller: 'propagateCtrl'
                }
            }
        })
        .state('main.propagateDetail',{
            url: '/propagateDetail',
            params: {
                "item": undefined,
                "typeIndex": 0,
                "pageNum": 0,
                "searchText": ''
            },
            views: {
                'content': {
                    templateUrl: '/partial/mis/collegePropagate/propagateDetail.html',
                    controller: 'propagateDetailCtrl'
                }
            }
        })
        .state('main.courseTable',{
            url: '/courseTable',
            views: {
                'content': {
                    templateUrl: '/partial/mis/courseConstruct/courseTable.html',
                    controller: 'courseTableCtrl'
                }
            }
        })
        .state('main.courseResource',{
            url: '/courseResource',
            views: {
                'content': {
                    templateUrl: '/partial/mis/courseConstruct/courseResource.html',
                    controller: 'courseResourceCtrl'
                }
            }
        })
        .state('main.absenceRecord',{
            url: '/absenceRecord',
            views: {
                'content': {
                    templateUrl: '/partial/mis/courseConstruct/absenceRecord.html',
                    controller: 'absenceRecordCtrl'
                }
            }
        })
        .state('main.dailySystem',{
            url: '/dailySystem',
            views: {
                'content': {
                    templateUrl: '/partial/mis/collegeRegulation/dailySystem.html',
                    controller: 'dailySystemCtrl'
                }
            }
        })
        .state('main.leaderDuty',{
            url: '/leaderDuty',
            views: {
                'content': {
                    templateUrl: '/partial/mis/collegeRegulation/leaderDuty.html',
                    controller: 'leaderDutyCtrl'
                }
            }
        })
        .state('main.messageBoard',{
            url: '/messageBoard',
            views: {
                'content': {
                    templateUrl: '/partial/mis/infoConstruct/messageBoard.html',
                    controller: 'messageBoardCtrl'
                }
            }
        })
        .state('main.systemNotice',{
            url: '/systemNotice',
            views: {
                'content': {
                    templateUrl: '/partial/mis/infoConstruct/systemNotice.html',
                    controller: 'systemNoticeCtrl'
                }
            }
        })
        .state('main.userManage',{
            url: '/userManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/userManage.html',
                    controller: 'userManageCtrl'
                }
            }
        })
        .state('main.studentManage',{
            url: '/studentManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/studentManage.html',
                    controller: 'studentManageCtrl'
                }
            }
        })
        .state('main.teacherManage',{
            url: '/teacherManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/teacherManage.html',
                    controller: 'teacherManageCtrl'
                }
            }
        })
        .state('main.classManage',{
            url: '/classManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/classManage.html',
                    controller: 'classManageCtrl'
                }
            }
        })
        .state('main.courseManage',{
            url: '/courseManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/courseManage.html',
                    controller: 'courseManageCtrl'
                }
            }
        })
        .state('main.courseDistribute',{
            url: '/courseDistribute',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/courseDistribute.html',
                    controller: 'courseDistributeCtrl'
                }
            }
        })
        .state('main.absenceManage',{
            url: '/absenceManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/absenceManage.html',
                    controller: 'absenceManageCtrl'
                }
            }
        })
        .state('main.propagateManage',{
            url: '/propagateManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/propagateManage.html',
                    controller: 'propagateManageCtrl'
                }
            }
        })
        .state('main.systemManage',{
            url: '/systemManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/systemManage.html',
                    controller: 'systemManageCtrl'
                }
            }
        })
        .state('main.accountManage',{
            url: '/accountManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/accountManage.html',
                    controller: 'accountManageCtrl'
                }
            }
        })
        .state('main.authorityManage',{
            url: '/authorityManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/authorityManage.html',
                    controller: 'authorityManageCtrl'
                }
            }
        })
        .state('main.infoManage',{
            url: '/infoManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/infoManage.html',
                    controller: 'infoManageCtrl'
                }
            }
        })
        .state('main.configManage',{
            url: '/configManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/configManage.html',
                    controller: 'configManageCtrl'
                }
            }
        });
}]);
