import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:geocoding/geocoding.dart';
// import 'package:in_codeinfinity_frotechpms/Utils/AuthManager.dart';

class GetLocation extends StatefulWidget {
  @override
  _GetLocationState createState() => _GetLocationState();
  static String address = "";
}

class _GetLocationState extends State<GetLocation> {
  String _cityName = 'Loading...';
  late Position co_ords = Position(
    latitude: 0.0,
    longitude: 0.0,
    timestamp: DateTime.fromMillisecondsSinceEpoch(0),
    accuracy: 0.0,
    altitude: 0.0,
    heading: 0.0,
    speed: 0.0,
    speedAccuracy: 0.0,
    altitudeAccuracy: 0.0,
    headingAccuracy: 0.0,
  );

  @override
  void initState() {
    super.initState();
    _getCurrentLocation();
  }

  Future<void> _getCurrentLocation() async {
    try {
      // Request permission to access the device's location
      LocationPermission permission = await Geolocator.requestPermission();

      if (permission == LocationPermission.denied) {
        print('Location permission denied');
        return;
      }

      // Get the current position (latitude and longitude)
      Position position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );
      print("Print the location is ${position.toString()}");

      // Use geocoding to get the city name from latitude and longitude
      List<Placemark> placemarks = await placemarkFromCoordinates(
        position.latitude,
        position.longitude,
      );

      if (placemarks.isNotEmpty) {
        print("Print the location is ${position.toString()}");
        Placemark placemark = placemarks.first;
        print(placemark.toString());
        setState(() {
          _cityName = (placemark.name.toString()) +
              ', ' +
              (placemark.subLocality.toString()) +
              ', ' +
              (placemark.locality.toString()) +
              ', ' +
              (placemark.subAdministrativeArea.toString()) +
              ', ' +
              placemark.administrativeArea.toString();
          co_ords = position;
          GetLocation.address = _cityName;
        });
        // AuthManager.setLocation(placemark, co_ords);
      } else {
        print("placemark is empty");
      }
    } catch (e) {
      print('Error: $e');
      setState(() {
        _cityName = 'Error getting location';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Center(
          child: Text(
            'City: $_cityName',
            style: TextStyle(fontSize: 18),
          ),
        ),
        Center(
          child: Text(
            GetLocation.address,
            style: TextStyle(fontSize: 18),
          ),
        ),
      ],
    );
  }
}
