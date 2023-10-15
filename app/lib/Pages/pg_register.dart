import 'package:line_awesome_flutter/line_awesome_flutter.dart';

import 'package:flutter/material.dart';
import 'package:hackmania/Utils/AppColors.dart';
import 'package:hackmania/Widgets/BigText.dart';

class pg_registration extends StatefulWidget {
  const pg_registration({super.key});

  @override
  _pg_registrationState createState() => _pg_registrationState();
}

class _pg_registrationState extends State<pg_registration> {
  String? _gender;
  bool picuploaded = false;
  bool picnotuploaded = false;

  String _selectedOption = 'Maharashtra';
  // late String name, Aadhaar_number, Experience, Bio, ExpectedSalary, taddress;
  // late int Age;

  final _formKey = GlobalKey<FormState>();
  late String _text = "";

  @override
  Widget build(BuildContext context) {
    TextEditingController _fullNameController = TextEditingController();
    TextEditingController _Gender = TextEditingController();
    TextEditingController _City = TextEditingController();
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    // TextEditingController _City = TextEditingController();

    late String Address;
    return Scaffold(
      body: Column(
        children: [
          Padding(
            padding: EdgeInsets.only(top: height * 0.10, bottom: 20),
            child: BigText(
              text: " Registration Form",
              size: 30,
              fw: FontWeight.bold,
            ),
          ),
          Center(
              child: Column(
            children: [
              picnotuploaded
                  ? Container(
                      child: BigText(
                        text: "**Please Upload a profile picture**",
                        size: 15,
                        colorr: AppColors.error,
                        ff: 'Playfair',
                      ),
                    )
                  : Container(),
            ],
          )),
          Expanded(
            child: Scrollbar(
              child: SingleChildScrollView(
                scrollDirection: Axis.vertical,
                child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Form(
                        key: _formKey,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            TextFormField(
                              controller: _fullNameController,
                              validator: (value) {
                                if (value == null || value.isEmpty) {
                                  return 'Full Name is required';
                                }
                                return null;
                              },
                              decoration: InputDecoration(
                                enabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                labelText: "Full Name",
                                prefixIcon: Icon(LineAwesomeIcons.user),
                              ),
                            ),
                            SizedBox(
                              height: height * 0.02,
                            ),
                            TextFormField(
                              controller: _fullNameController,
                              validator: (value) {
                                if (value == null || value.isEmpty) {
                                  return 'Full Name is required';
                                }
                                return null;
                              },
                              decoration: InputDecoration(
                                enabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                labelText: "City",
                                prefixIcon: Icon(LineAwesomeIcons.city),
                              ),
                            ),
                            TextFormField(
                              maxLength: 2,
                              keyboardType: TextInputType.number,
                              decoration: const InputDecoration(
                                labelText: 'DOB',
                              ),
                              onChanged: (value) {
                                setState(() {
                                  _text = value;
                                });
                              },
                            ),
                            const Padding(
                              padding: EdgeInsets.only(top: 15),
                              child: Text(
                                "Select State",
                                style: TextStyle(
                                    fontSize: 17,
                                    color: Color.fromARGB(255, 119, 119, 119)),
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.only(top: 8),
                              child: DropdownButton(
                                value: _selectedOption,
                                items: const [
                                  DropdownMenuItem(
                                      value: 'Maharashtra',
                                      child: Text('Maharashtra')),
                                  DropdownMenuItem(
                                      value: 'Karnataka',
                                      child: Text('Karnataka')),
                                  DropdownMenuItem(
                                      value: 'Maid', child: Text('Maid')),
                                  DropdownMenuItem(
                                      value: 'Cook', child: Text('Cook')),
                                  DropdownMenuItem(
                                      value: 'Dog Walker',
                                      child: Text('Dog Walker')),
                                  DropdownMenuItem(
                                      value: 'Driver', child: Text('Driver')),
                                ],
                                onChanged: (value) {
                                  setState(() {
                                    _selectedOption = value!;
                                  });
                                },
                              ),
                            ),
                            const SizedBox(height: 16.0),
                            Center(
                              child: ElevatedButton(
                                onPressed: () {
                                  if (picuploaded == true) {
                                    if (_formKey.currentState?.validate() ??
                                        true) {
                                      _formKey.currentState?.save();
                                      // FirebaseOperations.addWorker(
                                      //     page_LandingState
                                      //         .auth.currentUser?.uid
                                      //         .toString(),
                                      //     _selectedOption,
                                      //     name,
                                      //     Age,
                                      //     _gender,
                                      //     Aadhaar_number,
                                      //     Experience,
                                      //     Bio,
                                      //     ExpectedSalary,
                                      //     taddress,
                                      //     page_LandingState
                                      //         .auth.currentUser?.phoneNumber
                                      //         .toString());
                                      showDialog(
                                          context: context,
                                          builder: (ctx) => AlertDialog(
                                                title: const Text(
                                                    "Congratulations!"),
                                                content: const Text(
                                                    "Your registration is successful"),
                                                actions: <Widget>[
                                                  TextButton(
                                                    onPressed: () {
                                                      Navigator.of(ctx).pop();
                                                      Navigator
                                                          .pushNamedAndRemoveUntil(
                                                              context,
                                                              "/workerHome",
                                                              (route) => false);
                                                    },
                                                    child: Container(
                                                      color: Colors.lightBlue,
                                                      padding:
                                                          const EdgeInsets.all(
                                                              14),
                                                      child: const Text("okay",
                                                          style: TextStyle(
                                                              color: Colors
                                                                  .white)),
                                                    ),
                                                  ),
                                                ],
                                              ));
                                    }
                                  } else {
                                    setState(() {
                                      picnotuploaded = true;
                                    });
                                  }
                                },
                                child: Text('Submit'),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
