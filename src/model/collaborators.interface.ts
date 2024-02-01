import { Skills } from "./skill.interface";
import { User } from "./user.interface";

export interface Collaborators {
    _id: string;
    user: User;
    skills: Skills[];
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateCollaborators = Omit<Collaborators, '_id' | 'createdAt' | 'updatedAt'>

export type UpdateCollaborators = Omit<Collaborators, 'createdAt' | 'updatedAt'>