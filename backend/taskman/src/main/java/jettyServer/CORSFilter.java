package jettyServer;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



//CORSFilter sets all needed AccessControls
public class CORSFilter implements Filter{
	@Override
	public void doFilter(ServletRequest request, ServletResponse
			response, FilterChain chain) throws IOException, ServletException
	{
		
		if (request instanceof HttpServletRequest) {
			if(((HttpServletRequest)request).getMethod() != "OPTIONS" );
		}

		if (response instanceof HttpServletResponse)
		{
			((HttpServletResponse)response).setHeader("Access-Control-Allow-Origin", "*");
			((HttpServletResponse)response).setHeader("Access-Control-Allow-Credentials", "true");
			((HttpServletResponse)response).setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS, HEAD");
			((HttpServletResponse)response).setHeader("Access-Control-Allow-Headers", "Content-Type, Token, Accept, X-Requested-With");
		}
		chain.doFilter(request,response);
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {	
	}

	@Override
	public void destroy() {
	}
}
