import 'dart:async';

import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class MapSample extends StatefulWidget {
  const MapSample({super.key});

  @override
  State<MapSample> createState() => MapSampleState();
}

class MapSampleState extends State<MapSample> {
  final Completer<GoogleMapController> _controller =
      Completer<GoogleMapController>();

  static const CameraPosition _kGooglePlex = CameraPosition(
    target: LatLng(37.42796133580664, -122.085749655962),
    zoom: 14.4746,
  );

  // Define a set to store the markers.
  Set<Marker> _markers = {};

  @override
  void initState() {
    super.initState();
    // Add markers to the set when the widget is initialized.
    _addMarkers();
  }

  void _addMarkers() {
    // Add markers to the set using the Marker class.
    _markers.add(
      Marker(
        markerId: MarkerId('marker_1'),
        position: LatLng(37.43296265331129, -122.08832357078792),
        infoWindow: InfoWindow(title: 'Marker 1'),
      ),
    );

    _markers.add(
      Marker(
        markerId: MarkerId('marker_2'),
        position: LatLng(37.4219999, -122.0840575),
        infoWindow: InfoWindow(title: 'Marker 2'),
      ),
    );

    // You can add more markers as needed.
  }

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    return Container(
      height: 0.40 * height,
      width: width,
      child: GoogleMap(
        mapType: MapType.normal,
        initialCameraPosition: _kGooglePlex,
        onMapCreated: (GoogleMapController controller) {
          _controller.complete(controller);
        },
        markers: _markers, // Set of markers to display on the map.
      ),
    );
  }
}
