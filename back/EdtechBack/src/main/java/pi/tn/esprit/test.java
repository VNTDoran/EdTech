package pi.tn.esprit;

import java.io.DataInputStream;
import java.io.IOException;
import java.util.Scanner;

import static pi.tn.esprit.Utils.Mailer.sendMail;

public class test {
    public static void main(String[] args) throws IOException {
        sendMail("aa","aa","aa");
        /*Scanner myObj = new Scanner(System.in);
        System.out.println("enter an integer: ");
        try {
            int intnumber = myObj.nextInt();
            System.out.println("read "+intnumber);
            String number = String.valueOf(intnumber);
            String newStr = "";
            String num[] = {"0","1","","","","","9","","8","6"};
            for (int i = 0; i<number.length();i++){
                newStr=num[number.charAt(i)-48]+newStr;
            }
            System.out.println(newStr);
            if (newStr.length() == number.length() && newStr.equals(number)){
                System.out.println("valid : "+newStr);
            } else {
                System.out.println("Invalid");
            }
        }catch (Exception e){
            System.out.println("enter a valid number");
        }
*/
    }
}
