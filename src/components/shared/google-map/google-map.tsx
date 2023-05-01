import React from 'react';
import s from './google-map.module.scss';
import c from 'classnames';
import { mapStyle } from '../../../helpers/google-map/map-style';
import { ZoomPanel } from './components/zoom-panel/zoom-panel';
import { ICluster } from '../../../interfaces/shared/cluster.interface';
import GoogleMapReact, { Coords, Props } from 'google-map-react';
import { DrawingPanel } from './components/drawing-panel/drawing-panel';
import { IListingCard, IListingCardWithClusterId } from '../../../interfaces/buy/listing-card.interface';
import supercluster from 'points-cluster';
import { Marker } from './components/marker/marker';
import { Cluster } from './components/cluster/cluster';
import { Point } from './components/point/point';
import { MapButton } from './components/map-button/map-button';

const MAP: Props = {
  defaultZoom: 8,
  options: {
    disableDoubleClickZoom: true,
    disableDefaultUI: true,
    styles: mapStyle,
    minZoom: 4,
    maxZoom: 20,
    // mapTypeId: 'satellite',
    mapTypeId: 'roadmap',
  },
};

interface IProps {
  center?: Coords
  zoom?: number
  bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
  listings?: IListingCard[]
  drawingPanel?: boolean
  zoomPanel?: boolean
  mapButton?: boolean
  point?: boolean
  hoveredId?: string
  className?: string

  setListings?(listings: IListingCardWithClusterId[]): void

  getListing?(id: string): void

  setCenter?(center: google.maps.LatLng | google.maps.LatLngLiteral): void

  setPath?(path: string): void
}

interface IState {
  center: Coords
  zoom: number
  options: any,
  bounds: any
  clusters: ICluster[]
  map: google.maps.Map
  status: 'draw' | 'complete' | ''
  pointCoords: Coords
}

export class GoogleMap extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      center: props.center,
      zoom: props.zoom,
      options: MAP.options,
      bounds: [], clusters: [],
      map: undefined, status: '',
      pointCoords: undefined,
    };
  }

  componentDidMount() {
    this.setState({ center: this.props.center });
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>) {
    const { center, zoom, bounds, listings, point } = this.props;
    const { map } = this.state;

    if (center && center !== prevProps.center) {
      this.setState({ center });

      if (point) {
        this.setState({ pointCoords: center });
      }
    }

    if (zoom !== prevProps.zoom) {
      this.setState({ zoom });
    }

    if (bounds && prevProps.bounds) {
      map?.fitBounds(bounds);
      setTimeout(this.getClusters, 1500);
    }

    if (!bounds && listings && listings !== prevProps.listings) {
      this.getClusters();
    }
  }

  onZoomChanged = (value: 'inc' | 'dec') => {
    const { zoom } = this.state;

    this.setState({ zoom: value === 'inc' ? zoom + 1 : zoom - 1 });
  };

  onBoundsChanged = () => {
    const { setPath } = this.props;
    const { ne, sw } = this.state.bounds;
    const { lat: n, lng: e } = ne;
    const { lat: s, lng: w } = sw;
    const path: string = `[[[[${w}, ${n}], [${e}, ${n}], [${e}, ${s}],[${w}, ${s}], [${w}, ${n}]]]]`;

    setPath && setPath(path);
  };

  getClusters = () => {
    const { listings, setListings } = this.props;
    const { zoom, bounds } = this.state;
    const { nw, se } = bounds;
    const clustersConfig = supercluster(listings);
    const clusters = clustersConfig({ bounds: { nw, se }, zoom })
      .map(({ wx, wy, numPoints, points }) => ({
        id: `${numPoints}_${points[0].id}`,
        lat: wy,
        lng: wx,
        numPoints,
        points,
      }));
    const newClusters = clusters
      .map((cluster: ICluster) => cluster.points
        .map((listing: IListingCard) => ({ ...listing, clusterId: cluster.id })),
      ).flat();

    setListings(newClusters);
    this.setState({ clusters });
  };

  handleMapChange = ({ center: newCenter, zoom, bounds }) => {
    const { setCenter } = this.props;
    const { center } = this.state;

    this.setState({ center: newCenter, zoom, bounds });

    if (center !== newCenter) {
      setCenter && setCenter(newCenter);
    }
    this.onBoundsChanged();
  };

  changeStatus = (status: 'draw' | 'complete' | '') => {
    this.setState({ status });

    if (status === 'draw') {
      this.setState({ clusters: [] });
    }
  };

  changeMapType = (type: 'satellite' | 'roadmap') => {
    const { options } = this.state;

    this.setState({ options: { ...options, mapTypeId: type === 'satellite' ? 'satellite' : 'roadmap' } });
  };

  render(): React.ReactElement {
    const { mapButton, drawingPanel, zoomPanel, point, hoveredId, className, getListing, setPath } = this.props;
    const { center, zoom, options, map, clusters, status, pointCoords } = this.state;
    const { mapTypeId } = options;

    return (
      <div className={c(s.wrap, className && className)}>
        <GoogleMapReact
          defaultZoom={MAP.defaultZoom}
          options={options}
          center={center}
          zoom={zoom}
          onChange={this.handleMapChange}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => this.setState({ map })}
        >
          {
            point
              ? <Point {...pointCoords}/>
              : status !== 'draw' && clusters.map(({ points: listings, id, numPoints, ...cluster }: ICluster) =>
              numPoints > 1
                ? <Cluster
                  key={id}
                  map={map}
                  listings={listings}
                  numPoints={numPoints}
                  {...cluster}
                  hovered={hoveredId === id}
                  getListing={getListing}
                />
                : <Marker
                  key={id}
                  listing={listings[0]}
                  {...cluster}
                  hovered={hoveredId === id}
                  getListing={getListing}
                />,
            )
          }
        </GoogleMapReact>
        <DrawingPanel
          map={map}
          show={drawingPanel}
          status={status}
          setPath={setPath}
          resetBounds={this.onBoundsChanged}
          changeStatus={this.changeStatus}
        />
        <MapButton show={mapButton} mapType={mapTypeId} changeMapType={this.changeMapType}/>
        <ZoomPanel show={zoomPanel} onZoomChanged={this.onZoomChanged}/>
      </div>
    );
  }
}
