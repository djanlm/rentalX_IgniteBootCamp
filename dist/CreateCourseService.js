"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createCourseService = /** @class */ (function () {
    function createCourseService() {
    }
    createCourseService.prototype.execute = function (_a) {
        var duration = _a.duration, educator = _a.educator, name = _a.name;
        console.log(name, duration, educator);
    };
    ;
    return createCourseService;
}());
exports.default = new createCourseService();
