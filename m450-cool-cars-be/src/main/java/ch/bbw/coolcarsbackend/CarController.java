package ch.bbw.coolcarsbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:3000")
public class CarController implements ApplicationRunner {

    @Autowired
    private CarRepository carRepository;

    // Endpoint for sorted cars
    @GetMapping("cars/sorted")
    public List<Car> getSortedCars(
            @RequestParam String criteria,
            @RequestParam String order) {

        if (!criteria.matches("brand|model|horsePower") || !order.matches("asc|desc")) {
            throw new IllegalArgumentException("Invalid sort criteria or order");
        }

        // Create a Sort object
        Sort sort = order.equals("asc")
                ? Sort.by(Sort.Order.asc(criteria))
                : Sort.by(Sort.Order.desc(criteria));

        // Fetch sorted cars
        return (List<Car>) carRepository.findAll(sort);
    }

    @GetMapping("cars/search")
    public List<Car> search(@RequestParam String query){
        if (query == null || query.trim().isEmpty()) {
            return carRepository.findAll();
        }
        List<Car> cars = carRepository.findAll();
        return cars.stream()
        .filter(car -> car.getBrand().toUpperCase().contains(query.toUpperCase()) ||
                       car.getModel().toUpperCase().contains(query.toUpperCase()))
        .collect(Collectors.toList());
    }

    // Endpoint for all cars without sorting
    @GetMapping("cars")
    public List<Car> getCars() {
        // Use CrudRepository's findAll() method for unsorted data
        return (List<Car>) carRepository.findAll();
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Seed initial data
        carRepository.save(new Car(0, "Dodge", "Challenger", 500));
        carRepository.save(new Car(0, "Ford", "Mustang", 450));
        carRepository.save(new Car(0, "Chevrolet", "Camaro", 400));
    }

    @GetMapping("cars/{id}")
    public Car getACar(@PathVariable int id) {
        return carRepository.findById(id).orElse(null);
    }
}
