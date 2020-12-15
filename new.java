import java.util.*;

class Main{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Welcome. This App will determine a number odd/even");
        System.out.println("==================================================");


        System.out.print("How many times you want to perform this function? ");
        int t  = sc.nextInt();

        int count = 1;
        while( t-- > 0 ){
            System.out.print("Please input a number for loof " + count++ + " : ");
            int number = sc.nextInt();
            if( number % 2 == 0 ){
                System.out.println("You entered " + number + " and it is EVEN.");
            }else{
                System.out.println("You entered " + number + " and it is ODD.");
            }
        }
        System.out.println("Ok completed. See you again.");
    }
}