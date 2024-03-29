import javax.ws.rs.*;
import javautil

@path("/parfumes")
public class ParfumesResources{
    public static List<String> parfume = new ArrayList<>();

    @GET
    @Proceduces(MediaType.TEXT_PLAIN)
    public Response getParfumes() {
        return Response.ok(parfume).build();
        }
   
    @GET
    @Proceduces(MediaType.TEXT_PLAIN)
    @Path("/size")
    public Integer countParfumes(){
        return parfume.size();
    }
}
