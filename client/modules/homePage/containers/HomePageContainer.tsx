import * as React from 'react';
import {Grid} from 'material-ui';
import {AboutPaper, TechCard} from '../components';

interface Props {}

interface Technology {
    readonly imgSrc: string;
    readonly title: string;
    readonly description: string;
}

const technologies: Technology[] = [
    {imgSrc: '/static/images/react.png', title: 'React', description: 'A JavaScript library for building user interfaces'},
    {imgSrc: '/static/images/material-design.png', title: 'Material Design', description: 'Make beautiful products, faster'},
    {imgSrc: '/static/images/redux.png', title: 'Redux', description: 'Predictable state container'},
    {imgSrc: '/static/images/graphql.png', title: 'GraphQL', description: 'A query language for your API'},
    {imgSrc: '/static/images/apollo.png', title: 'Apollo', description: 'Tools for GraphQL'},
    {imgSrc: '/static/images/ts.png', title: 'TypeScript', description: 'JavaScript that scales'},
    {imgSrc: '/static/images/nextjs.jpeg', title: 'Next.js', description: 'Framework for server-rendered React apps'},
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
