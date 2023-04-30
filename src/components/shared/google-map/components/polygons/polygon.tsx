import React from 'react';

interface IProps {
  map: google.maps.Map
  path: any
}

interface IState {
  polygon: google.maps.Polygon
}

class Polygon extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      polygon: new google.maps.Polygon({
        fillColor: '#0175D8',
        fillOpacity: .1,
        strokeColor: '#0175D8',
        strokeWeight: 1,
        clickable: false,
        zIndex: 1,
      }),
    };
  }

  componentDidMount() {
    const { map, path } = this.props;
    const { polygon } = this.state;

    polygon.setOptions({
      paths: path.map((item) => ({
        lat: item[1],
        lng: item[0],
      })),
    });

    polygon.setMap(map);
  }

  componentDidUpdate(prevProps: Readonly<IProps>) {
    const { path } = this.props;
    const { polygon } = this.state;

    if (path && path !== prevProps.path) {
      polygon.setOptions({ paths: path });
    }
  }

  componentWillUnmount() {
    this.state.polygon.setMap(null);
  }

  render(): React.ReactElement {
    return null;
  }
}

export default Polygon;
