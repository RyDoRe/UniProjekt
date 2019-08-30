import { User } from '../services/auth.service';

export interface TaskBoardTemplate {
    id: string;
    name: string;
    pages?: TaskBoardSliderPage[];
    taskItems?: TaskItem[];
}

export interface TaskBoardSliderPage {
    id: string;
    name: string;
    displayOrder?: number;
    state?: string;
    isDefault?: boolean;
}

export interface TaskItem {
    id: string;
    name: string;
    state?: string;
    description: string;
    startDate: number;
    endDate: number;
    assignUser?: User;
    userId: string;
    pageId?: string;
    boardId?: string;
}
