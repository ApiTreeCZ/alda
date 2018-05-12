import * as React from 'react';
import {Grid} from 'material-ui';
import {AboutPaper, TechCard} from '../components';
import {Lang} from '../../../Lang';

interface Props {}

interface Technology {
    readonly imgSrc: string;
    readonly title: string;
    readonly description: string;
}

const technologies: Technology[] = [
    {imgSrc: '/static/images/react.png', title: 'React', description: Lang.TECH.REACT},
    {imgSrc: '/static/images/material-design.png', title: 'Material Design', description: Lang.TECH.MD},
    {imgSrc: '/static/images/redux.png', title: 'Redux', description: Lang.TECH.REDUX},
    {imgSrc: '/static/images/graphql.png', title: 'GraphQL', description: Lang.TECH.GRAPHQL},
    {imgSrc: '/static/images/apollo.png', title: 'Apollo', description: Lang.TECH.APOLLO},
    {imgSrc: '/static/images/ts.png', title: 'TypeScript', description: Lang.TECH.TS},
    {imgSrc: '/static/images/nextjs.jpeg', title: 'Next.js', description: Lang.TECH.NEXTJS},
];

class Container extends React.Component<Props> {
    render() {
        return (
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <AboutPaper />
                </Grid>
                {technologies.map((row) => (
                    <Grid item xs={12} sm={6} md={3} key={row.title}>
                        <TechCard {...row} />
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export const HomePageContainer = Container;
