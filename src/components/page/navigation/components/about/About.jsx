import style from './About.module.css';

const About = () => {
    return (
        <div className={'flex-column-relative'}>
            <p className={style.p}>
                Reoptinew is a library of new ideas, crafts, life-hacks, and
                more. Big ideas and small ideas, all are welcome! 💡 If you
                tick any of the boxes below, you might feel right at home when
                visiting Reoptinew.
                <br />
                <br />
                You want to:
                <br />
                • explore DIY crafts share life-hacks like washing dishes like
                a pro
                <br /> • make your own potato chips
                <br />• showcase advanced builds like soapboxes or homemade
                robots <br />• find something to do on a Saturday afternoon
                <br />• discover alternative ways of doing everyday stuff{' '}
                <br />• find a solution to a specific problem <br />
                <br />A couple of wooden boards. A metal wire. An old wheel
                from a discarded bicycle. To most, these are scraps, forgotten,
                insignificant, not worth a second thought. But to a mind
                trained to see potential, these are the seeds of something
                greater. At Reoptinew you see the extraordinary in the ordinary
                and get to be a part of it too. Share your own builds and
                follow your favorite crafters at Reoptinew.
            </p>
        </div>
    );
};

export default About;
