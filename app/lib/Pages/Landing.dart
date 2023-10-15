import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class Landing_Page extends StatefulWidget {
  const Landing_Page({super.key});
  static String UID = '';
  static FirebaseAuth auth = FirebaseAuth.instance;

  @override
  State<Landing_Page> createState() => _Landing_PageState();
}

class _Landing_PageState extends State<Landing_Page> {
  @override
  void initState() {
    super.initState();
    // Future.delayed(Duration.zero, () async {
    //   // print("Checking in landing 1" +
    //   //     FirebaseAuth.instance.currentUser!.uid.toString());

    //   if (FirebaseAuth.instance.currentUser != null) {
    //     try {
    //       print("already logged in");
    //       setState(() {
    //         Landing_Page.UID = auth.currentUser!.uid.toString();
    //       });
    //       Navigator.pushNamedAndRemoveUntil(
    //           context, '/dashboard', (route) => false);
    //     } catch (e) {}
    //   } else {
    //     print("inside else:");
    //     // Navigator.pushNamedAndRemoveUntil(
    //     //     context, '/login', ModalRoute.withName('/login'));
    //   }
    // });
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(body: Center(child: CircularProgressIndicator()));
  }
}
