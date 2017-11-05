import * as mongoose from 'mongoose';
export type RoleTypes = 'user' | 'superuser';



export interface IUserDocument extends mongoose.Document {
	userName: string;
	domain: string;
	assocId: string;
	email: string;
	associate: {
		first_name: string;
		last_name: string;
	};
	isAdmin: boolean;
	roles: Array<RoleTypes>;
	created_at: Date;
	updated_at: Date;
	hash: string;
	created_by: string;
	updated_by: string;
}

export interface IUserModel extends mongoose.Model<any>{
	currentUser?: string;
	exists: (query: any) => Promise<boolean>;
}
