#This file is an instruction to run the Assembly test files:
#assembly_test_1.spec.ts
#assembly_test_2.spec.ts
#assembly_test_3.spec.ts

#These test files require a stub service (e.g - SOAP UI) to be running
#By default,these tests will not be included in the test pack

Step 1: 
To run any of the Assembly test cases,first rename the files.
e.g - 'assembly_test_1.specs.ts' TO 'assembly_test_1.spec.ts'

Step 2:
Start the SOAP UI project within ITMPAngular

Step 3:
Make changes to 'test.ts' file (/src/test.ts) to run a single test file like below:
Change 'const context = require.context('./', true, /\.spec\.ts$/);'
To 'const context = require.context('./', true, /assembly_test_1.spec.ts/);' 

Step 4:
Run NPM test using command - 'ng test'

