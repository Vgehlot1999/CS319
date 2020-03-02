import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Scanner;

public class MyServer {
	public static final String access = "cs319spring2020";
	public static ArrayList<ClientHandler> cList = new ArrayList<ClientHandler>();
	//String ClientAccess = MyClient.aCode;
	
	public static void main(String[] args) throws IOException {
		ServerSocket serverSocket = null;
		int clientNum = 0;

		
		try {
			serverSocket = new ServerSocket(4444);
			System.out.println(serverSocket);
		} 
		
		catch (IOException e) {
			System.out.println("Could not listen on port: 4444");
			System.exit(-1);
		}
		System.out.println("Waiting for client to connect!");
		while (true) { // 3.
			Socket clientSocket = null;
			
			try {
				
				clientSocket = serverSocket.accept();
				ClientHandler client = new ClientHandler(clientSocket, clientNum+1);
				cList.add(client);
				Thread thread = new Thread(client);
				thread.start();




			} catch (IOException e) {
				System.exit(-1);
			}
		}
	}
}

class ClientHandler extends MyServer implements Runnable {
	Socket s; // this is socket on the server side that connects to the CLIENT
	int num; // keeps track of its number just for identifying purposes
	PrintWriter out;
	String string = "";


	ClientHandler(Socket s, int n) {
		this.s = s;
		num = n;
	}


	public void run() {
		Scanner in;
		try {
			validate();
			in = new Scanner(new BufferedInputStream(s.getInputStream()));
			out = new PrintWriter(new BufferedOutputStream(s.getOutputStream()));

			while(true) {
				string = in.nextLine();
				System.out.println("(server side) " + string);
				for(ClientHandler c : cList)
				{
					if (!c.equals(this)) {
						c.getWriter().println(string);
						c.getWriter().flush();
					}
				}
			}
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public PrintWriter getWriter() {
		return out;
	}
	
	private String cleanValidate(String str) {
		int index = str.indexOf(":");
		String cleanStr = str.substring(index + 2);
		return cleanStr;
	}
	
	private void validate() throws IOException {
		BufferedReader br;
		
		while(true) {
			br = new BufferedReader(new InputStreamReader(this.s.getInputStream(), "UTF-8"));
			String s =br.readLine();
			String sNew = cleanValidate(s);
			//System.out.println("Your password is: " + sNew);
			BufferedOutputStream out = new BufferedOutputStream(this.s.getOutputStream());
			PrintWriter p = new PrintWriter(out, false);
			if(!(access.equals(sNew))) {
				p.println("Incorrect access code, try again");
				p.flush();
			}
			
			else {
				p.println("You are connected");
				p.flush();
				break;
			}
		}
	}

}
