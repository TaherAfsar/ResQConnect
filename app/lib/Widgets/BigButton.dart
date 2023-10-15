import 'package:hackmania/Utils/AppColors.dart';
import 'package:hackmania/Utils/Page_Router.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class BigButton extends StatelessWidget {
  final String text;
  final IconData? ic;
  final double width;
  final VoidCallback callback;

  final double size;
  const BigButton(
      {super.key,
      required this.text,
      this.ic,
      this.width = 1.0,
      required this.size,
      required this.callback});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: MediaQuery.of(context).size.width * width,
      child: ElevatedButton(
          style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.ButtonBG1,
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15.0)),
              padding: EdgeInsets.only(
                  left: 25.0, right: 20.0, top: 8.0, bottom: 8.0)),
          onPressed: callback,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            // ignore: prefer_const_literals_to_create_immutables
            children: [
              Text(
                text,
                style: GoogleFonts.inter(
                    color: AppColors.font2,
                    fontSize: size,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 1),
              ),
              Icon(
                ic,
                color: AppColors.font2,
              )
            ],
          )),
    );
  }
}
