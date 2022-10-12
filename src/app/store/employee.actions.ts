

export class GetEmployeesAction {
    static readonly type = '[Employee] GetEmployees'
}

export class GetEmplyeeByIdAction {
    static readonly type = '[Employee] GetEmployeeById';
    constructor(public id: number){}
}

export class GetCheckDataByIdAction {
    static readonly type = '[Employee] GetEmployeeById';
    constructor(public id: number){}
}