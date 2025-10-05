package Server.Dashboard.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Bean
	public SecurityFilterChain SecurityFilter(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests(
				authorize -> authorize
				.anyRequest().authenticated()
				.requestMatchers("/test").permitAll()
				);
		return http.build();
	}
}
