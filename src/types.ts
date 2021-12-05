export interface Classroom {
    id: string;
    abbreviation: string;
    name: string;
    availableTime: string[];
}

export interface GithubIssue {
    title: string;
    body: string;
}

export interface FormSubmitResult {
    type: string;
    message: string;
}