import React from 'react';
import s from './drawing-panel.module.scss';
import { Button } from '../../../button/button';
import * as turf from 'turf';
import unkinkPolygon from '@turf/unkink-polygon';
import Polygon from '../polygons/polygon';
import { buttons } from './buttons.data';
import { polylineOptions } from './polyline-options.data';

interface IProps {
  map: google.maps.Map
  show?: boolean
  status: 'draw' | 'complete' | ''

  setPath(path: string): void

  resetBounds(): void

  changeStatus(status: 'draw' | 'complete' | ''): void
}

interface IState {
  bounds: number[][][]
}

export class DrawingPanel extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { bounds: [] };
  }

  draw = () => {
    google.maps.event.addDomListener(this.props.map.getDiv(), 'mousedown', () => this.drawFreeHand());
    this.disable();
    this.props.changeStatus('draw');
  };

  complete = () => {
    google.maps.event.clearListeners(this.props.map.getDiv(), 'mousedown');
    this.enable();
    this.getListings();
    this.props.changeStatus('complete');
  };

  reset = () => {
    google.maps.event.clearListeners(this.props.map.getDiv(), 'mousedown');
    this.enable();
    this.props.changeStatus('');
    this.props.resetBounds();
    this.setState({ bounds: [] });
  };

  drawFreeHand = () => {
    const { map } = this.props;
    const polyline = new google.maps.Polyline({ map, ...polylineOptions });
    const move = google.maps.event.addListener(map, 'mousemove', (e) => polyline.getPath().push(e.latLng));

    google.maps.event.addListenerOnce(map, 'mouseup', () => {
      const polylinePath = polyline.getPath().getArray();

      google.maps.event.removeListener(move);
      polyline.setMap(null);

      if (polylinePath.length >= 3) {
        const polygonPath = polylinePath.map((item) => [item.lng(), item.lat()]);
        polygonPath.push(polygonPath[0]);

        const polygon = turf.polygon([polygonPath]);
        const simplifyPolygon = turf.simplify(polygon, .0001, false);
        const polygons = unkinkPolygon(simplifyPolygon).features.map((item) => item.geometry.coordinates[0]);

        this.setState({ bounds: [...this.state.bounds, ...polygons] });
      }
    });
  };

  disable = () => {
    this.props.map.setOptions({ draggable: false, scrollwheel: false });
  };

  enable = () => {
    this.props.map.setOptions({ draggable: true, scrollwheel: true });
  };

  getListings = () => {
    const { setPath } = this.props;
    const { bounds } = this.state;
    let union: GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon> = null!;

    if (bounds.length === 1) {
      setPath && setPath(JSON.stringify([bounds]));
    } else if (bounds.length >= 2) {
      union = turf.union(turf.polygon([bounds[0]]), turf.polygon([bounds[1]]));

      if (bounds.length > 2) {
        for (let i = 2; i < bounds.length; i++) {
          if (union.geometry.type === 'MultiPolygon') {
            // @ts-ignore
            union = turf.union(turf.multiPolygon(union.geometry.coordinates), turf.polygon([bounds[i]]));
          } else {
            union = turf.union(turf.polygon(union.geometry.coordinates), turf.polygon([bounds[i]]));
          }
        }
      }

      if (union.geometry.type === 'MultiPolygon') {
        setPath(JSON.stringify(union.geometry.coordinates));
      } else {
        setPath(JSON.stringify([union.geometry.coordinates]));
      }
    }

    if (bounds.length > 1) {
      this.setNewBounds(union);
    }
  };

  setNewBounds = (union: GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon>) => {
    if (union.geometry.type === 'MultiPolygon') {
      const newBounds = union.geometry.coordinates
        .map((polygon: number[][][]) => this.transformToBound(polygon[0]));

      this.setState({ bounds: newBounds as any });
    } else {
      const newBound = this.transformToBound(union.geometry.coordinates[0]);

      this.setState({ bounds: [newBound as any] });
    }
  };

  transformToBound = (points: number[][]): google.maps.LatLngLiteral[] => {
    return points.map((point: number[]) => ({ lat: point[1], lng: point[0] }));
  };

  render(): React.ReactElement {
    const { show, map, status } = this.props;
    const { bounds } = this.state;

    return show
      ? <div className={s.drawing}>
        {
          buttons.map(({ status: statusBtn, text, action, disabled }) => (
            status === statusBtn &&
            <Button
              key={text}
              className={s.drawing__btn}
              color="blueLight"
              disabled={disabled && !bounds.length}
              onClick={this[action]}
            >
              {text}
            </Button>
          ))
        }
        {
          bounds.map((path: number[][], index: number) => (
            <Polygon key={index} map={map} path={path}/>
          ))
        }
      </div>
      : null;
  }
}
