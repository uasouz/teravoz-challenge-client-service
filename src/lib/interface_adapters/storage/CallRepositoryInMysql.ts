import database from "../../frameworks_drivers/database";
import {ICallRepository} from "../../application_business_rules/repositories/CallRepository";
import {Call} from "../../enterprise_business_rules/models/Call";

class CallRepositoryInMysql implements ICallRepository {
    FindCall(params: any): Promise<Call> {
        return undefined;
    }

    RegisterCallEvent(): Promise<boolean> {
        return undefined;
    }


}

export const userRepository = new CallRepositoryInMysql();