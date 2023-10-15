import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:hackmania/Utils/AppColors.dart';
import 'package:hackmania/Widgets/BigText.dart';
import 'package:hackmania/Widgets/GetLocation.dart';
import 'package:hackmania/Widgets/GoogleMaps.dart';
import 'package:permission_handler/permission_handler.dart';

class HomeScreen extends StatefulWidget {
  static Map<String, dynamic> userData = {};
  static Position? locationdata = null;
  HomeScreen({
    super.key,
  });

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  //
  //
  late String nameU = "";

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    // fetchlocation();
    _requestLocationPermission();
  }

  Future<void> _requestLocationPermission() async {
    final PermissionStatus permissionStatus =
        await Permission.locationWhenInUse.request();
    if (permissionStatus == PermissionStatus.granted) {
      print("permission granterd");
      // fetchlocation();
    } else {
      print("permission denied");
    }
  }

  void fetchlocation() async {
    print('Fetching location...');

    Position currentPosition =
        await Geolocator.getCurrentPosition().then((value) {
      print('Printing location:' + value.toString());
      setState(() {
        HomeScreen.locationdata = value;
        print("Location dat is ${value}");
      });
      return value;
    }).catchError((e) {
      print('Error getting location:');
      print(e);
      return null;
    });
  }

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    String namee = "Ramesh!";
    // final String? name = page_LandingState.auth.currentUser?.uid.toString();
    // getdata();
    if (nameU == "") {}
    print("buildinng");
    return LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {
      final maxWidth = constraints.maxWidth;
      final scaleFactor = maxWidth / 400; // assuming 400 is the base width
      final fontSize = 20.0 * scaleFactor;
      final fontSizeB = 35.0 * scaleFactor;
      final fontSizes = 18.0 * scaleFactor;
      final containerwidth = 200 * scaleFactor;
      return SafeArea(
        child: Scaffold(
          // bottomNavigationBar: Bottom_NavBar(indexx: 0),
          appBar: AppBar(
              backgroundColor: AppColors.ThemeBlue2,
              foregroundColor: Colors.white,
              title: BigText(
                text: "ResQConnect",
                fw: FontWeight.bold,
                colorr: Colors.white,
              ),
              centerTitle: true,
              elevation: 0.0,
              flexibleSpace: Container(
                  decoration: const BoxDecoration(
                gradient: LinearGradient(
                    colors: [
                      Color(0xFF3366FF),
                      Color(0xFF00CCFF),
                    ],
                    begin: FractionalOffset(0.0, 0.0),
                    end: FractionalOffset(1.0, 0.0),
                    stops: [0.0, 1.0],
                    tileMode: TileMode.clamp),
              ))),
          body: Column(
            children: [
              Container(
                child: BigText(text: "${HomeScreen.locationdata}"),
              ),
              GetLocation(),
              // Container(
              //   height: height * 0.40,
              //   color: AppColors.ButtonBG1,
              //   width: width,
              //   child: MyMap(),
              // ),
              Container(
                height: height * 0.40,
                width: width,
                child: MapSample(),
              )
            ],
          ),
        ),
      );
    });
  }
}
