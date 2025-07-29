import { Observable } from "rxjs";
import { Masters } from "../../app/dataModels/common/common";

export abstract class MastersServicebase {

    abstract getAllMasters(): Observable<Masters[]>;

}
