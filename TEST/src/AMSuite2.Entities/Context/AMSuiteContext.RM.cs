using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.Entities.DataClasses;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AMSuite2.Entities.Context
{
    public partial class AMSuiteContext
    {
        public void OnModelCreating_RM(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Conference>(entity =>
            {
                entity.Property(e => e.ConferenceName).HasMaxLength(500);

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.PointOfContactPhone).HasMaxLength(13);

                entity.Property(e => e.RegistrationCutOffDate).HasColumnType("date");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.HasOne(d => d.ConferenceLocation)
                    .WithMany(p => p.Conference)
                    .HasForeignKey(d => d.ConferenceLocationId)
                    .HasConstraintName("FK_Conference_ConferenceLocation");
            });

            modelBuilder.Entity<ConferenceBuilding>(entity =>
            {
                entity.Property(e => e.BuildingName)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<ConferenceLocation>(entity =>
            {
                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.Email).HasMaxLength(250);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.State)
                    .IsRequired()
                    .HasMaxLength(2);

                entity.Property(e => e.Telephone).HasMaxLength(13);

                entity.Property(e => e.Zip)
                    .IsRequired()
                    .HasMaxLength(5);
            });

            modelBuilder.Entity<ConferenceRoom>(entity =>
            {
                entity.Property(e => e.RoomName)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.HasOne(d => d.ConferenceBuilding)
                    .WithMany(p => p.ConferenceRoom)
                    .HasForeignKey(d => d.ConferenceBuildingId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_ConferenceRoom_ConferenceBuilding");

                entity.HasOne(d => d.ConferenceLocation)
                    .WithMany(p => p.ConferenceRoom)
                    .HasForeignKey(d => d.ConferenceLocationId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_ConferenceRoom_ConferenceLocation");
            });
        }
    }
}
