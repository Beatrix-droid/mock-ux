import axios,{ AxiosResponse}  from "axios";
export interface Employee{
    id:number;
    name:string;
    DateOfBirth:string;
    StartDate:string;
    active: boolean;

}
0	



export const fetchEmployees = async (): Promise<Array<Employee> | string> => {
    const employeeUrl = 'https://mocki.io/v1/8576cc05-5366-4b49-8e3a-bddc45e442e9'
 
 try{
    const response: AxiosResponse = await axios.get(employeeUrl);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
    }
}