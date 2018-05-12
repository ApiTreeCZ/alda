const ABOUT = 'about';
const ABOUT_QUESTIONS = `${ABOUT}.questions`;

const TECH = 'tech';

export const Lang = {
    TITLE: 'title',
    ABOUT: {
        DESCRIPTION: `${ABOUT}.description`,
        QUESTIONS: {
            START_WITH_REACT: `${ABOUT_QUESTIONS}.startWithReact`,
            START_WITH_MD: `${ABOUT_QUESTIONS}.startWithMD`,
            START_WITH_REDUX: `${ABOUT_QUESTIONS}.startWithRedux`,
        },
        WITH_TYPESCRIPT: `${ABOUT}.withTypescript`,
    },
    TECH: {
        REACT: `${TECH}.react`,
        MD: `${TECH}.md`,
        REDUX: `${TECH}.redux`,
        GRAPHQL: `${TECH}.graphql`,
        APOLLO: `${TECH}.apollo`,
        TS: `${TECH}.ts`,
        NEXTJS: `${TECH}.nextjs`,
    },
};
