package jettyServer;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.servlet.ServletContainer;

import java.util.EnumSet;

import javax.servlet.DispatcherType;

public class App {

	public static void main(String[] args) throws Exception {
		ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
		context.setContextPath("/");

		Server jettyServer = new Server(8080);

		jettyServer.setHandler(context);


		EnumSet<DispatcherType> dispatches =
				EnumSet.allOf(DispatcherType.class);
		
		FilterHolder holder = new FilterHolder(CORSFilter.class);
		holder.setName("filter");
		context.addFilter(holder,"/*",dispatches);

		ServletHolder jerseyServlet = context.addServlet(ServletContainer.class, "/*");
		jerseyServlet.setInitOrder(0);

		jerseyServlet.setInitParameter("jersey.config.server.provider.packages", "project.Taskman.backend.restprj;services");
		
		try {
			jettyServer.start();
			jettyServer.join();
		} catch (Exception e) {
			e.printStackTrace();
		} finally{
			jettyServer.destroy();
		}




		
	}
}