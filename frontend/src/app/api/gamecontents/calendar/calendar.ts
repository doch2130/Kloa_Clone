
const url = 'https://developer-lostark.game.onstove.com/gamecontents/calendar';

async function calendarData() {
  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'accept': 'application/json',
        'authorization': `bearer ${process.env.NEXT_PUBLIC_LOSTARK_API}`
      },
    });
    console.log('response ', response);
  } catch (err) {
    console.log('err ', err);
  }
}

// calendarData();

export default calendarData;