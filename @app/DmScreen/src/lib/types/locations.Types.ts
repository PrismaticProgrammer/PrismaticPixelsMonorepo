export interface World {
	id: string;
	name: string;
	owner_id: string;
	description: string;
	map: string;
}
// Declare an array of World objects
export type Worlds = World[];
