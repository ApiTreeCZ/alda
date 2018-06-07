import {Grid} from '@material-ui/core';
import * as React from 'react';

import {PageContainer} from '../../../containers';
import {Lang} from '../../../Lang';
import {AboutPaper, TechCard} from '../components';

interface Props {}

interface Technology {
    readonly imgSrc: string;
    readonly title: string;
    readonly description: string;
}

const technologies: Technology[] = [
    {imgSrc: '/static/images/react.png', title: 'React', description: Lang.TECH_REACT},
    {imgSrc: '/static/images/material-design.png', title: 'Material Design', description: Lang.TECH_MD},
    {imgSrc: '/static/images/redux.png', title: 'Redux', description: Lang.TECH_REDUX},
    {imgSrc: '/static/images/graphql.png', title: 'GraphQL', description: Lang.TECH_GRAPHQL},
    {imgSrc: '/static/images/apollo.png', title: 'Apollo', description: Lang.TECH_APOLLO},
    {imgSrc: '/static/images/ts.png', title: 'TypeScript', description: Lang.TECH_TS},
    {imgSrc: '/static/images/nextjs.jpeg', title: 'Next.js', description: Lang.TECH_NEXTJS},
];

class Container extends React.Component<Props> {
    render() {
        return (
            <PageContainer>
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
            </PageContainer>
        );
    }
}

export const HomePageContainer = Container;
