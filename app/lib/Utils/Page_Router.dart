import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:hackmania/Pages/Home.dart';
import 'package:hackmania/Pages/Login_page.dart';
import 'package:hackmania/Pages/pg_register.dart';
import 'package:hackmania/Widgets/GoogleMaps.dart';
import '../Pages/Landing.dart';
import 'package:hackmania/Pages/Homepage.dart';
import 'package:hackmania/Pages/OTP_screen.dart';

class Page_Router {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case '/':
        return PageRouteBuilder(pageBuilder: (_, __, ___) => HomeScreen());

      case '/login':
        return PageRouteBuilder(pageBuilder: (_, __, ___) => Login_page());

      case '/Home':
        return PageRouteBuilder(pageBuilder: (_, __, ___) => Homepage());

      case '/OTP':
        return PageRouteBuilder(pageBuilder: (_, __, ___) => OTP_screen());

      default:
        return PageRouteBuilder(pageBuilder: (_, __, ___) => Landing_Page());
    }
  }
}
