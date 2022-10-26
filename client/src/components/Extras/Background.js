setBackground(currentHour) {
    if (currentHour < 3) {
      setState('night-2');
    } else if (currentHour < 6) {
      setState({ background  : 'dawn'});
    } else if (currentHour < 9) {
      setState({ background  : 'morning'});
    } else if (currentHour < 12) {
      setState({ background  : 'afternoon-1'});
    } else if (currentHour < 15) {
      setState({ background  : 'afternoon-2'});
    } else if (currentHour < 18) {
      setState({ background  : 'evening-1'});
    } else if (currentHour < 21) {
      setState({ background  : 'evening-2'});
    } else if (currentHour < 24) {
      setState({ background  : 'night-1'});
    }
}

// setTime 
// call setbackground, pass it the time