import MongoApi from "./dataSource/database";


export type DataSourceContext = {
    dataSource: {
        usersDb:  MongoApi;
        notesDb: MongoApi;
    }
}
