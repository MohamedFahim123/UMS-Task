interface PageHeadingProps {
    currPageHead: string;
};

export default function PageHeading({ currPageHead }: PageHeadingProps) {
    return <h2>{currPageHead || ''}</h2>;
};