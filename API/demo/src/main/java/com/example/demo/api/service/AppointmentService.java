package com.example.demo.api.service;

import com.example.demo.api.dtos.request.AppointmentRequest.AppointmentRequest;
import com.example.demo.api.dtos.request.PaymentRequest.PaymentRequest;
import com.example.demo.api.dtos.response.AppointmentResponse.AppointmentResponse;
import com.example.demo.api.dtos.response.AuthenticationResponse.SignInResponse;
import com.example.demo.api.dtos.response.UserResponse.UserResponse;
import com.example.demo.api.entities.*;
import com.example.demo.api.enums.AppointmentStatus;
import com.example.demo.api.enums.Role;
import com.example.demo.api.exception.DuplicateEntity;
import com.example.demo.api.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.checkerframework.checker.units.qual.A;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Service
public class AppointmentService {

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    SlotRepository slotRepository;

    @Autowired
    ServicesRepository servicesRepository;

    @Autowired
    BranchRepository branchRepository;


    @Autowired
    ModelMapper modelMapper;

    @Transactional
    public AppointmentResponse createAppointment(AppointmentRequest appointmentRequest) {
        try {
            User stylist = userRepository.findUserById(appointmentRequest.getUserId());
            if (stylist.getRole() != Role.STYLIST) {
                throw new EntityNotFoundException("Stylist not found");
            }

            // Check if the stylist is already booked for the requested date and slot
            Slot slot = slotRepository.findById(appointmentRequest.getSlotId())
                    .orElseThrow(() -> new EntityNotFoundException("Slot not found"));

            boolean isStylistBooked = appointmentRepository.existsByUserAndSlotAndAppointmentDate(
                    stylist, slot, appointmentRequest.getAppointmentDate().toString());

            if (isStylistBooked) {
                throw new DuplicateEntity("Stylist is already booked for this time slot.");
            }

            Branch branch = branchRepository.findBranchByBranchName(appointmentRequest.getBranchName());
            if (branch == null) {
                throw new EntityNotFoundException("Branch not found");
            }

            String formattedDate = appointmentRequest.getAppointmentDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));

            // Save appointment into the database
            Appointment appointment = new Appointment();
            appointment.setAppointmentDate(formattedDate);
            appointment.setServices(servicesRepository.findServicesById(appointmentRequest.getServiceId()));
            appointment.setUser(stylist);
            appointment.setSlot(slot);
            appointment.setBranch(branch);
            appointment.setFullname(appointmentRequest.getFullname());
            appointment.setPhoneNumber(appointmentRequest.getPhoneNumber());
            appointment.setAppointmentStatus(AppointmentStatus.PENDING);
            appointment.setTotal(appointmentRequest.getTotal());
            appointmentRepository.save(appointment);

            // Create userResponse
            UserResponse stylistResponse = new UserResponse();
            stylistResponse.setId(stylist.getId());
            stylistResponse.setUsername((stylist.getUsername()));
            stylistResponse.setRole(stylist.getRole().toString());
            stylistResponse.setEmail(stylist.getEmail());
            stylistResponse.setPhoneNumber(stylist.getPhoneNumber());
            stylistResponse.setStaffSpecialty(stylist.getStaffSpecialty());

            // Create appointment response
            AppointmentResponse appointmentResponse = modelMapper.map(appointment, AppointmentResponse.class);
            appointmentResponse.setUserId(userRepository.findUserByPhoneNumber(appointmentRequest.getPhoneNumber()).getId());
            appointmentResponse.setUser(stylistResponse);
            appointmentResponse.setServiceName(appointment.getServices().getServiceName());
            appointmentResponse.setBranchName(branch.getBranchName());
            appointmentResponse.setSlotTime(slot.getSlotTime());
            appointmentResponse.setAppointmentDate(formattedDate);
            appointmentResponse.setTotal(appointment.getTotal());

            return appointmentResponse;
        } catch (DuplicateEntity e) {
            throw e; // Re-throw to indicate stylist is booked
        } catch (EntityNotFoundException e) {
            throw new RuntimeException("Error creating appointment: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Error creating appointment: " + e.getMessage());
        }
    }


    public List<AppointmentResponse> getAllAppointments() {
        // Retrieve all appointments from the repository
        List<Appointment> list = appointmentRepository.findAll();
        // Map the list of Appointment entities to AppointmentResponse DTOs
        List<AppointmentResponse> appointmentResponses = new ArrayList<>();
        for (Appointment appointment : list) {
            AppointmentResponse appointmentResponse = modelMapper.map(appointment, AppointmentResponse.class);
            // Set additional fields if needed, for example:
            appointmentResponse.setServiceName(appointment.getServices().getServiceName());
            appointmentResponse.setBranchName(appointment.getBranch().getBranchName());
            appointmentResponse.setSlotTime(appointment.getSlot().getSlotTime());
            appointmentResponse.setAppointmentDate(appointment.getAppointmentDate());
            appointmentResponses.add(appointmentResponse);
        }
        return appointmentResponses; // Return the list of AppointmentResponse
    }



    //get appointments from user's phone number
    public List<AppointmentResponse> getUserAppointments(String phoneNumber){

        // Retrieve all appointments from the repository
        List<Appointment> list = appointmentRepository.findAppointmentsByPhoneNumber(phoneNumber);
        // Map the list of Appointment entities to AppointmentResponse DTOs
        List<AppointmentResponse> appointmentResponses = new ArrayList<>();
        for (Appointment appointment : list) {
            AppointmentResponse appointmentResponse = modelMapper.map(appointment, AppointmentResponse.class);
            // Set additional fields if needed, for example:
            appointmentResponse.setServiceName(appointment.getServices().getServiceName());
            appointmentResponse.setBranchName(appointment.getBranch().getBranchName());
            appointmentResponse.setSlotTime(appointment.getSlot().getSlotTime());
            appointmentResponse.setAppointmentDate(appointment.getAppointmentDate());
            appointmentResponses.add(appointmentResponse);
        }
        return appointmentResponses; // Return the list of AppointmentRespons
    }



    public String createUrl(AppointmentRequest appointmentRequest) throws  Exception {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime createDate = LocalDateTime.now();
        String formattedCreateDate = createDate.format(formatter);
        // tao lich

      AppointmentResponse appointmentResponse = createAppointment(appointmentRequest);
      float money = appointmentResponse.getTotal() * 100;
      String ammout = String.valueOf((int) money);
        String tmnCode = "IQIQOSWK";
        String secretKey = "S6ONQQNSPWF7B09NGDXZRVRKRQ78WJTW";
        String vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        String returnUrl = " http://localhost:5173/" ;//+ appointmentResponse.getId();
        String currCode = "VND";

        Map<String, String> vnpParams = new TreeMap<>();
        vnpParams.put("vnp_Version", "2.1.0");
        vnpParams.put("vnp_Command", "pay");
        vnpParams.put("vnp_TmnCode", tmnCode);
        vnpParams.put("vnp_Locale", "vn");
        vnpParams.put("vnp_CurrCode", currCode);
        vnpParams.put("vnp_TxnRef", String.valueOf(appointmentResponse.getId()));
        vnpParams.put("vnp_OrderInfo", "Thanh toan cho ma GD: " + appointmentResponse.getId());
        vnpParams.put("vnp_OrderType", "other");
        vnpParams.put("vnp_Amount", ammout);

        vnpParams.put("vnp_ReturnUrl", returnUrl);
        vnpParams.put("vnp_CreateDate", formattedCreateDate);
        vnpParams.put("vnp_IpAddr", "128.199.178.23");

        StringBuilder signDataBuilder = new StringBuilder();
        for (Map.Entry<String, String> entry : vnpParams.entrySet()) {
            signDataBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8.toString()));
            signDataBuilder.append("=");
            signDataBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString()));
            signDataBuilder.append("&");
        }
        signDataBuilder.deleteCharAt(signDataBuilder.length() - 1); // Remove last '&'

        String signData = signDataBuilder.toString();
        String signed = generateHMAC(secretKey, signData);

        vnpParams.put("vnp_SecureHash", signed);

        StringBuilder urlBuilder = new StringBuilder(vnpUrl);
        urlBuilder.append("?");
        for (Map.Entry<String, String> entry : vnpParams.entrySet()) {
            urlBuilder.append(URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8.toString()));
            urlBuilder.append("=");
            urlBuilder.append(URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8.toString()));
            urlBuilder.append("&");
        }
        urlBuilder.deleteCharAt(urlBuilder.length() - 1); // Remove last '&'

        return urlBuilder.toString();
    }


    private String generateHMAC(String secretKey, String signData) throws NoSuchAlgorithmException, InvalidKeyException {
        Mac hmacSha512 = Mac.getInstance("HmacSHA512");
        SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
        hmacSha512.init(keySpec);
        byte[] hmacBytes = hmacSha512.doFinal(signData.getBytes(StandardCharsets.UTF_8));

        StringBuilder result = new StringBuilder();
        for (byte b : hmacBytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }


    public AppointmentResponse getAppointmentById(long id) {
        Appointment appointment = appointmentRepository.findAppointmentById(id);

        String formattedDate = appointment.getAppointmentDate().format(String.valueOf(DateTimeFormatter.ofPattern("dd/MM/yyyy")));

        User stylist = userRepository.findUserById(appointment.getUser().getId());
        User Customer = userRepository.findUserByPhoneNumber(appointment.getUser().getPhoneNumber());
        // Create userResponse
        UserResponse stylistResponse = new UserResponse();
        stylistResponse.setId(stylist.getId());
        stylistResponse.setUsername((stylist.getUsername()));
        stylistResponse.setRole(stylist.getRole().toString());
        stylistResponse.setEmail(stylist.getEmail());
        stylistResponse.setPhoneNumber(stylist.getPhoneNumber());
        stylistResponse.setStaffSpecialty(stylist.getStaffSpecialty());

        // Create appointment response
        AppointmentResponse appointmentResponse = modelMapper.map(appointment, AppointmentResponse.class);
        appointmentResponse.setUserId(Customer.getId());
        appointmentResponse.setUser(stylistResponse);
        appointmentResponse.setServiceName(appointment.getServices().getServiceName());
        appointmentResponse.setBranchName(appointment.getBranch().getBranchName());
        appointmentResponse.setSlotTime(appointment.getSlot().getSlotTime());
        appointmentResponse.setAppointmentDate(formattedDate);
        appointmentResponse.setTotal(appointment.getTotal());

        return appointmentResponse;
    }
}
