import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    marginTop: 20,
    padding: '0 40px',

    '& form': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',

      '& .left': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '1 1 auto',

        '& .realTimeSwitch': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          '& h2': {
            display: 'inline-block',
          },
        },
      },

      '& .right': {
        display: 'flex',
        justifyContent: 'center',
        flex: '2 1 auto',

        '& .container': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingRight: 20,

          '@media only screen and (max-width: 1024px)': {
            flexDirection: 'column',
          },

          '& .title': {
            paddingRight: 100,

            '@media only screen and (max-width: 1024px)': {
              width: '100%',
              textAlign: 'center',
              padding: '0px',
            },
          },

          '& .rows': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 60,

            '@media only screen and (max-width: 1024px)': {
              paddingTop: 20,
            },

            '& .row': {
              display: 'flex',
              alignItems: 'center',

              '& + .row': {
                marginTop: 60,
              },

              '& .itemLabel': {
                minWidth: 300,
                marginLeft: 20,
                fontSize: '1.3rem',
                fontWeight: 500,
              },

              '& .itemSelect': {
                minWidth: 300,
                marginLeft: 20,
              },

              '& .itemInput': {
                minWidth: 300,
                marginLeft: 20,
              },
            },
          },
        },
      },
    },
  },
}));
