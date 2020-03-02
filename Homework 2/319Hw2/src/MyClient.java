import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Scanner;

public class MyClient {

	Socket sS;
	ServerListener sL;
	String aCode = MyServer.access;
	
	MyClient() 
	{
		Scanner nameScan = new Scanner(System.in);
		Scanner accessScan = new Scanner(System.in);
		Scanner messageScan = new Scanner(System.in);
		
		System.out.println("Enter your name: (After giving input “name”, then press Enter)");
		String name = nameScan.nextLine();

		System.out.println("Enter access code: (After giving input “access code”, then press Enter)");
		//aCode = aCodeScan.nextLine();
		
//		while(true) {
//			String access = accessScan.nextLine();
//
//			if(!(access.equals(aCode))) {
//				System.out.println("Incorrect access code");
//			}
//			
//			else {
//				System.out.println("You are connected");
//				break;
//			}
//		}
		
		try {
			sS = new Socket("localhost", 4444);
		} 
		
		catch (UnknownHostException e) {
			e.printStackTrace();
		} 
		
		catch (IOException e) {
			e.printStackTrace();
		}
		
		sL = new ServerListener(this, sS);
		new Thread(sL).start();
		
		PrintWriter out;
		
		try {
			out = new PrintWriter(new BufferedOutputStream(sS.getOutputStream()));
			while(true) {
				String message = messageScan.nextLine();

				out.println(name + ": " + message);
				out.flush();
			}

		}
		catch (IOException e) {
			e.printStackTrace();
			
		}
		System.exit(-1);
		nameScan.close();
		accessScan.close();
		messageScan.close();
		
	}
	
	public void handleMessage(String s) {
		System.out.println(s);
	}

	public static void main(String[] args) {
		MyClient client = new MyClient();
	}
	
}

class ServerListener implements Runnable {
	MyClient client;
	Scanner in;
	
	ServerListener(MyClient client, Socket s) {
		try {
			this.client = client;
			in = new Scanner(new BufferedInputStream(s.getInputStream()));
		} 
		catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void run() {
		// TODO Auto-generated method stub
		while(true) {
			String s = in.nextLine();
			client.handleMessage(s);
		}
	}
}