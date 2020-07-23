import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    marginTop: 50,
    padding: '0 80px',

    '& .top': {},
    '& .bottom': {
      '& .left': {
        flex: '1 1 300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '& .realTimeSwitch': {
          '& h2': {
            display: 'inline-block',
          },
        },
      },

      '& .right': {
        flex: '1 1 auto',

        '& .container': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',

          '& .title': {
            paddingRight: 100,
          },

          '& .rows': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 60,

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
