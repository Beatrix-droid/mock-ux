import axios,{ AxiosResponse}  from "axios";

export interface EmployeeShifts{
    Id:number;
    Location:string;
    Role:string;
    PersonId:number;
    Start:string;
    End: string;
}


0	


export const fetchEmployeeShifts = async (employeeId:number): Promise<Array<EmployeeShifts> | string> => {
    const employeeDetailsUrl = 'https://mocki.io/v1/9b0e9cf7-470c-463a-adb2-40c938d58441'
   console.log("chosen id"+ employeeId)
    try {
        const response: AxiosResponse = await axios.get(employeeDetailsUrl);
        const unfilteredData=response.data
        const filteredData=unfilteredData.filter((item: EmployeeShifts) =>
            item.PersonId===employeeId)
        return filteredData;
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
        return "An unknown error occured"
    }
}