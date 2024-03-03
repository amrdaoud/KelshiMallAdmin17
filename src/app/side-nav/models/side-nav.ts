export interface SideNavElement {
    Name: string,
    Route?: string;
    Icon: string;
    Children?: SideNavElement[];
    Roles?: string[] 
}