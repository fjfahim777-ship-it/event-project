export interface ApiEvent {
    _id: string;
    title: string;
    category: string;
    date: string;
    location: string;
    image: string;
}

export interface EventCardProps {
    id: string;
    title: string;
    category: string;
    date: string;
    location: string;
    image: string;
}

export interface EventDetails {
    _id: string;
    title: string;
    category: string;
    date: string;
    location: string;
    image: string;
    description: string;
}

export interface JoinEvent {
    _id: string;
    title: string;
    image: string;
}

export interface JoinedEvent {
    _id: string;
    eventId: string;
    eventTitle: string;
    eventImage: string;
    eventCategory: string;
    eventLocation: string;
    eventDate: string;
}

export interface ManageEventCardProps {
    id: string;
    title: string;
    category: string;
    date: string;
    location: string;
    image: string;
    onDelete: (id: string) => void;
}

export interface EditEvent {
    _id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    location: string;
    image: string;
    creatorEmail: string;
}